# import os
# from celery import Celery
# from decouple import config

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
# app = Celery('config', broker=config('REDIS_URL', default='redis://localhost:6379/0'))
# app.config_from_object('django.conf:settings', namespace='CELERY')
# app.autodiscover_tasks()



# config/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

