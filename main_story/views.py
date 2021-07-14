from django.shortcuts import render
import json
from ipware import get_client_ip
from .models import *
from analytics.models import *
from django.core import serializers


def mainStory(request, pk):
    # 초기에 데이터가 없을 결우를 생각해서 if문을 추가, 에러가 발생하지 않도록 한다
    if (MainStory.objects):
        get_product = MainStory.objects.get(id=pk)
        object = MainStory.objects.filter(category='沿革編', part_number=1)
    else:
        get_product = None
        object = None

    # if (MainStory.objects):
    #     object = MainStory.objects.filter(category='沿革編', part_number=1)
    # else:
    #     object = None

    query_dic = {}
    queryset = MainStory.objects.values('chapter', 'part', 'id')
    for product in queryset:
        ls = []
        chapter = product['chapter']
        part = product['part']
        id = product['id']
        ls.append({part: str(id)})
        # print()

        if chapter not in query_dic.keys():
            query_dic[chapter] = ls
        else:
            query_dic[chapter] += ls
    # print(query_dic)


    json_queryset = json.dumps(query_dic)
    json_object = serializers.serialize("json", object)
    # print(queryset)

    params = {
        'object': object,
        'json_object': json_object,
        'get_product': get_product,
        'json_queryset': json_queryset,
    }

    path = request.path
    browser_version = request.user_agent.browser.version_string
    browser_name = request.user_agent.browser.family
    usAgent = str(request.user_agent)
    lsUsAgent = usAgent.strip().split('/')
    device_name = lsUsAgent[0].strip()
    device_os = lsUsAgent[1].strip()

    # 유저 IP 확인 ------------------------------------
    client_ip, is_routable = get_client_ip(
        request,
        request_header_order=['X_FORWARDED_FOR', 'REMOTE_ADDR']
    )

    print('유저IP : ' + client_ip)
    print('browser_name : ' + browser_name)
    print('browser_version : ' + browser_version)

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
    print('access_history : ', access_history)
    access_history.save()
    return render(request, 'main_story/main_story.html', {'params': params})