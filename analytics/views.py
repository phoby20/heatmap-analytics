from django.shortcuts import render
from index.models import *
from main_story.models import *
from django.core.serializers import serialize
from django.shortcuts import redirect
from .models import *
import json
from datetime import datetime, date, timedelta
from django.http import HttpResponse
import csv
from io import TextIOWrapper, StringIO
from django.conf import settings
from config.settings import *
import os
import boto3


from html2image import Html2Image

month_dict = {
            'January': '01',
            'February': '02',
            'March': '03',
            'April': '04',
            'May': '05',
            'June': '06',
            'July': '07',
            'August': '08',
            'September': '09',
            'October': '10',
            'November': '11',
            'December': '12',
        }
def analytics(request):
    # now_year = datetime.today().year
    # now_month = datetime.today().month
    enddate = date.today() + timedelta(days=1)
    startdate = enddate - timedelta(days=7)

    point_count = pointCount.objects.filter(upload_dt__range=[startdate, enddate])

    data = accessHistory.objects.filter(access_dt__range=[startdate, enddate])
    # print(datetime.today().year)

    list_dic = {}
    for g in range(point_count.count()):
        title = point_count[g].title
        path = point_count[g].path
        # print(path)
        if path == '/':
            path = ''

        if title in list_dic.keys():
            list_dic[title][0] += 1
        else:
            list_dic[title] = [1, path]

    date_array = {}
    browser_array = {}
    device_array = {}
    print('list_dic : ', list_dic)
    print('HTTP_HOST : ', request.META.get("HTTP_HOST"))

    for i in range(data.count()):
        month = data[i].access_dt.month
        day = data[i].access_dt.day
        browser_name = data[i].browser_name
        device_name = data[i].device_name

        hantei = str(month) + '.' + str(day)
        if hantei not in date_array.keys():
            date_array[hantei] = 1
        else:
            date_array[hantei] += 1

        # 브라우져 종류 카운트
        if browser_name not in browser_array.keys():
            browser_array[browser_name] = 1
        else:
            browser_array[browser_name] += 1

        # 디바이스 종류 카운트
        if device_name not in device_array.keys():
            device_array[device_name] = 1
        else:
            device_array[device_name] += 1

    params = {
        'list_dic': json.dumps(list_dic, ensure_ascii=False),
        'clickCounts': point_count.count(),
        'accessCount': data.count(),
        'date_array': json.dumps(date_array),
        'browser_array': json.dumps(browser_array),
        'device_array': json.dumps(device_array)
    }
    return render(request, 'analytics/analytics.html', {'params': params})

# def allclickmap_detail(request):
#     items = pointCount.objects.all()
#     params = {
#         'items': serialize("json", items)
#     }
#     return render(request, 'analytics/allclickmap_detail.html', {'params': params})


def allclickmap(request, pk):
    host = request._current_scheme_host
    print('pk : ', pk)
    if pk == 'index':
        items = pointCount.objects.filter(cursor_id='/')
    else:
        items = pointCount.objects.filter(cursor_id=pk)
    print('items : ', items)
    params = {
        'pk': pk,
        'items': serialize("json", items)
    }

    if pk == 'index':
        path = host
        save_as_path ='click_detail_index.png'
    else:
        path = host + '/main_story/chapter/' + str(pk)
        save_as_path = 'click_detail_' + pk + '.png'

    hti = Html2Image()
    hti.output_path = 'static/image/allclickmap'
    hti.screenshot(
        url=path,
        save_as=save_as_path)

    # S3업로드
    fname = 'static/image/allclickmap/click_detail_' + pk + '.png'
    s3_client = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    s3_client.upload_file(
        fname,
        AWS_STORAGE_BUCKET_NAME,
        'static/image/allclickmap/' + 'click_detail_' + pk + '.png')
    return render(request, 'analytics/allclickmap.html', {'params': params})


def carefully_read(request, pk):
    host = request._current_scheme_host
    if (MainStory.objects):
        object = MainStory.objects.filter(category='沿革編', part_number=1)
    else:
        object = None
    # items = moveHistory.objects.all()
    if pk == 'index':
        items = moveHistory.objects.filter(cursor_id='/')
    else:
        items = moveHistory.objects.filter(cursor_id=pk)

    print('items : ', items)
    print('pk : ', pk)
    print('host : ', host)
    params = {
        'pk': pk,
        'object': object,
        'items': serialize("json", items),
        'img': BASE_DIR + 'static/image/carefully_read/read_detail_' + pk + '.png'
    }
    if pk == 'index':
        path = host
        save_as_path ='read_detail_index.png'
    else:
        path = host + '/main_story/chapter/' + str(pk)
        save_as_path = 'read_detail_' + pk + '.png'
    hti = Html2Image()
    hti.output_path = 'static/image/carefully_read'
    hti.screenshot(
        url=path,
        save_as=save_as_path)

    # S3업로드
    fname = 'static/image/carefully_read/read_detail_' + pk + '.png'
    s3_client = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    s3_client.upload_file(
        fname,
        AWS_STORAGE_BUCKET_NAME,
        'static/image/carefully_read/' + 'read_detail_' + pk + '.png')
    return render(request, 'analytics/carefully_read.html', {'params': params})



# def read_detail(request):
#     if (MainStory.objects):
#         object = MainStory.objects.filter(category='沿革編', part_number=1)
#     else:
#         object = None
#     items = moveHistory.objects.all()
#
#     params = {
#         'object': object,
#         'items': serialize("json", items)
#     }
#     return render(request, 'analytics/read_detail.html', {'params': params})


# def masu_heatmap_detail(request):
#     items = pointCount.objects.all()
#     params = {
#         'items': serialize("json", items)
#     }
#     return render(request, 'analytics/masu_heatmap_detail.html', {'params': params})


def masu_heatmap(request, pk):
    host = request._current_scheme_host
    print('host : ', host)
    print('pk : ', pk)
    if pk == 'index':
        items = pointCount.objects.filter(cursor_id='/')
    else:
        items = pointCount.objects.filter(cursor_id=pk)
    print('items : ', items)
    params = {
        'pk': pk,
        'items': serialize("json", items)
    }

    if pk == 'index':
        path = host
        save_as_path = 'masu_heatmap_index.png'
    else:
        path = host + '/main_story/chapter/' + str(pk)
        save_as_path = 'masu_heatmap_' + pk + '.png'

    hti = Html2Image()
    hti.output_path = 'static/image/masu_heatmap'
    hti.screenshot(
        url=path,
        save_as=save_as_path)

    # S3업로드
    fname = 'static/image/masu_heatmap/masu_heatmap_' + pk + '.png'
    s3_client = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    s3_client.upload_file(
        fname,
        AWS_STORAGE_BUCKET_NAME,
        'static/image/masu_heatmap/' + 'masu_heatmap_' + pk + '.png')

    if request.method == 'POST':
        date_from = request.POST.get('date-from')
        date_to = request.POST.get('date-to')

        date_from_list = date_from.strip().split(',')
        date_from_month_list = date_from_list[0].split()

        data_from_year = date_from_list[1]
        data_from_month = month_dict[date_from_month_list[0]]
        data_from_day = date_from_month_list[1]


        date_to_list = date_to.strip().split(',')
        date_to_month_list = date_to_list[0].split()

        data_to_year = date_to_list[1]
        data_to_month = month_dict[date_to_month_list[0]]
        data_to_day = date_to_month_list[1]

        fromDate = datetime(int(data_from_year), int(data_from_month), int(data_from_day))
        toDate = datetime(int(data_to_year), int(data_to_month), int(data_to_day)) + timedelta(days=1)

        if pk == 'index':
            items = pointCount.objects.filter(upload_dt__range=[fromDate, toDate], cursor_id='/')
        else:
            items = pointCount.objects.filter(cursor_id=pk, upload_dt__range=[fromDate, toDate])


        date_array = {}

        for i in range(items.count()):
            month = items[i].upload_dt.month
            day = items[i].upload_dt.day

            hantei = str(month) + '.' + str(day)
            if hantei not in date_array.keys():
                date_array[hantei] = 1
            else:
                date_array[hantei] += 1

        params = {
            'pk': pk,
            'items': serialize("json", items)
        }
        hti = Html2Image()
        hti.output_path = 'static/image/masu_heatmap'
        hti.screenshot(
            url=path,
            save_as=save_as_path)

        # S3업로드
        fname = 'static/image/masu_heatmap/masu_heatmap_' + pk + '.png'
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
        s3_client.upload_file(
            fname,
            AWS_STORAGE_BUCKET_NAME,
            'static/image/masu_heatmap/' + 'masu_heatmap_' + pk + '.png')
        return render(request, 'analytics/masu_heatmap.html', {'params': params})
    return render(request, 'analytics/masu_heatmap.html', {'params': params})






import pandas as pd
def upload(request):
    if request.method == 'POST':  # CSVをDBに保存
        mainstory = MainStory.objects.all()
        mainstory.delete()

        form_data = TextIOWrapper(request.FILES['main_story_csv'].file, encoding='shift-jis')
        csv_file = csv.DictReader(form_data)

        key_list = []
        for row in csv_file:
            for key in row.keys():
                if key in key_list:
                    break
                key_list.append(key)

            # CSVから抽出した内容をDBに保存
            main_story_db = MainStory(
                category=row[key_list[0]],
                chapter=row[key_list[1]],
                chapter_number=row[key_list[2]],
                part=row[key_list[3]],
                part_number=row[key_list[4]],
                title=row[key_list[5]],
                context1=row[key_list[6]],
            )


            main_story_db.save()
        return redirect('/analytics/upload')
    return render(request, 'analytics/upload.html')



def pv_select(request):
    enddate = date.today() + timedelta(days=1)
    startdate = enddate - timedelta(days=7)
    data = accessHistory.objects.filter(access_dt__range=[startdate, enddate])
    print('startdate : ', startdate , 'enddate : ', enddate)

    date_array = {}

    for i in range(data.count()):
        month = data[i].access_dt.month
        day = data[i].access_dt.day

        hantei = str(month) + '.' + str(day)
        if hantei not in date_array.keys():
            date_array[hantei] = 1
        else:
            date_array[hantei] += 1

    params = {
        'date_array': json.dumps(date_array),
    }

    if request.method == 'POST':
        date_from = request.POST.get('date-from')
        date_to = request.POST.get('date-to')

        date_from_list = date_from.strip().split(',')
        date_from_month_list = date_from_list[0].split()

        data_from_year = date_from_list[1]
        data_from_month = month_dict[date_from_month_list[0]]
        data_from_day = date_from_month_list[1]


        date_to_list = date_to.strip().split(',')
        date_to_month_list = date_to_list[0].split()

        data_to_year = date_to_list[1]
        data_to_month = month_dict[date_to_month_list[0]]
        data_to_day = date_to_month_list[1]

        fromDate = datetime(int(data_from_year), int(data_from_month), int(data_from_day))
        toDate = datetime(int(data_to_year), int(data_to_month), int(data_to_day)) + timedelta(days=1)

        data = accessHistory.objects.filter(access_dt__range=[fromDate, toDate])
        date_array = {}

        for i in range(data.count()):
            month = data[i].access_dt.month
            day = data[i].access_dt.day

            hantei = str(month) + '.' + str(day)
            if hantei not in date_array.keys():
                date_array[hantei] = 1
            else:
                date_array[hantei] += 1

        params = {
            'date_array': json.dumps(date_array),
        }
        return render(request, 'analytics/analytics_page/pv_select.html', {'params': params})
    return render(request, 'analytics/analytics_page/pv_select.html', {'params': params})






def delete(request):
    items = pointCount.objects.all()
    move = moveHistory.objects.all()
    items.delete()
    move.delete()
    return redirect('/analytics')