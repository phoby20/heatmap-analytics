"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import environ

env = environ.Env()
env.read_env('.env')


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'w&f6%#715$z7va%y$d8po(2o1r#=^x*lr%zxwai3xdr(u)zd3m'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
DEBUG = False




ALLOWED_HOSTS = ['127.0.0.1', '54.238.32.63', 'ec2-54-238-32-63.ap-northeast-1.compute.amazonaws.com', '.compute.amazonaws.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 'channels',
    'django_user_agents',

    'index',
    'analytics',
    'main_story',

    'storages',
]
# ASGI_APPLICATION = 'index.routing.application'
MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_user_agents.middleware.UserAgentMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE':env('DB_ENGINE'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
    }
}


# Heroku: Update database configuration from $DATABASE_URL.
# db_from_env = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(db_from_env)


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

# Local일 결우 여기를 활성화 해야함
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# 여기까지

# django_heroku.settings(locals())

X_FRAME_OPTIONS = 'ALLOW'


# Name of cache backend to cache user agents. If it not specified default
# cache alias will be used. Set to `None` to disable caching.
USER_AGENTS_CACHE = 'default'

# # Configure Django App for Heroku.
# import django_heroku
# django_heroku.settings(locals())


# -----------------------------------------------------------------------------------------------
# AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
#
# AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
# AWS_REGION = env('AWS_REGION')
# AWS_S3_CUSTOM_DOMAIN = '%s.s3.%s.amazonaws.com' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION)
#
# AWS_S3_OBJECT_PARAMETERS = {
#     'CacheControl': 'max-age=86400',
# }
# AWS_DEFAULT_ACL = 'public-read'
# # AWS_AUTO_CREATE_BUCKET = True
# AWS_LOCATION = 'static'
#
# STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
# DEFAULT_FILE_STORAGE = 'heatmap.asset_storage.MediaStorage'
# -----------------------------------------------------------------------------------------------

MEDIA_URL = '/media/'    # ← これ追加
# MEDIA_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# SITE_ID = 1