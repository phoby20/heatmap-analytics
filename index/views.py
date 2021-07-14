from django.shortcuts import render
from datetime import datetime
from .models import *
from main_story.models import *
from analytics.models import *
from django.core.serializers import serialize
from django.shortcuts import redirect
from django.views.decorators.http import require_POST, require_GET
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
import json
from ipware import get_client_ip

@require_POST
def post_input(request):
    if request.method == 'POST':  # POSTの処理
        # path = request.path
        # 유저 IP 확인 ------------------------------------
        client_ip, is_routable = get_client_ip(request, request_header_order=['X_FORWARDED_FOR', 'REMOTE_ADDR'])
        usAgent = str(request.user_agent)
        lsUsAgent = usAgent.strip().split('/')
        device_name = lsUsAgent[0].strip()
        device_os = lsUsAgent[1].strip()


        # 클릭 정보 저장
        if request.POST.get('obj') != None:
            objData = request.POST['obj']  # ajax 통신을 통해서 template에서 POST방식으로 전달
            jsonData = json.loads(objData)


            path = jsonData['path']
            cursor_id = path[-1:-37:-1][::-1]
            title = jsonData['title']
            pointX = jsonData['pointX']
            pointY = jsonData['pointY']
            windowWidth = jsonData['width']
            windowHeight = jsonData['height']

            # ua_string = jsonData['agent']
            # user_agent = parse(ua_string)
            # print(request.user_agent)
            # print('path : ', path[-1:-37:-1][::-1])
            # cursor_id = path[-1:-37:-1][::-1]


            pc = pointCount(
                ip=client_ip,
                path=path,
                cursor_id=cursor_id,
                title=title,
                pointX=pointX,
                pointY=pointY,
                width=windowWidth,
                height=windowHeight,
                device_name=device_name,
                device_os=device_os,
            )
            pc.save()

        # 커서 움직임 저장
        data_array = request.POST['array']
        jsondata_array = json.loads(data_array)
        print(jsondata_array)
        for i in range(len(jsondata_array)):
            path2 = jsondata_array[i]['path']
            cursor_id2 = path2[-1:-37:-1][::-1]
            # print(jsondata_array[i]['path'])
            move_history = moveHistory(
                ip=client_ip,
                path=path2,
                cursor_id=cursor_id2,
                layerX=jsondata_array[i]['layerX'],
                layerY=jsondata_array[i]['layerY'],
                offsetX=jsondata_array[i]['offsetX'],
                offsetY=jsondata_array[i]['offsetY'],

                clientX=jsondata_array[i]['clientX'],
                clientY=jsondata_array[i]['clientY'],

                width=jsondata_array[i]['width'],
                height=jsondata_array[i]['height'],
            )

            move_history.save()

        context = {'success': 'success'}
        return HttpResponse(json.dumps(context), content_type="application/json")

def Index(request):
    items = pointCount.objects.all()
    if (MainStory.objects):
        object = MainStory.objects.filter(category='沿革編', part_number=1)
    else:
        object = None

    params = {
        'items': serialize("json", items),
        'object': object,
    }
    # print('pointCount : ', items)
    path = request.path
    browser_version = request.user_agent.browser.version_string
    browser_name = request.user_agent.browser.family
    usAgent = str(request.user_agent)
    lsUsAgent = usAgent.strip().split('/')
    device_name = lsUsAgent[0].strip()
    device_os = lsUsAgent[1].strip()

    # 유저 IP 확인 ------------------------------------
    client_ip, is_routable = get_client_ip(request, request_header_order=['X_FORWARDED_FOR', 'REMOTE_ADDR'])
    # print('유저IP : ' + client_ip)
    # print('browser_name : ' + browser_name)
    # print('browser_version : ' + browser_version)


    # 유저 로그인 히스토리 저장 ------------------------------------
    access_history = accessHistory(
        ip=client_ip,
        path=path,
        # title=title,
        browser_name=browser_name,
        browser_version=browser_version,
        device_name=device_name,
        device_os=device_os,
        accesscount=1)
    # print('access_history : ', access_history)
    access_history.save()
    # print(request.path)
    return render(request, 'index/index.html', {'params': params})
