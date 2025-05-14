from django.contrib import admin
from product_management.models import Recipe, Tutorial, Blog
# Register your models here.
admin.site.register(Recipe)
admin.site.register(Tutorial)
admin.site.register(Blog)