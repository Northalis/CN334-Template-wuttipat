"""
URL configuration for product_service project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from product_management.views import *

router = DefaultRouter()
router.register(r'recipe', RecipeViewSet)
router.register(r'tutorial', TutorialViewSet)
router.register(r'blog', BlogViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/recipe/add', add_recipe, name='add_recipe'),
    path('api/tutorial/add', add_tutorial, name='add_tutorial'),
    path('api/blog/add', add_blog, name='add_blog'),
    # path('api/user/<int:user_id>/recipe/', user_recipes, name='user-recipes'),
    # path('api/user/<int:user_id>/tutorial/', user_tutorials, name='user-tutorials'),
    # path('api/user/<int:user_id>/blog/', user_blogs, name='user-blogs'),
    path('api/recipe/<int:recipe_id>', RecipeDetailAPIView.as_view(), name='recipe-detail'),
    path('api/tutorial/<int:tutorial_id>', TutorialDetailAPIView.as_view(), name='tutorial-detail'),
    path('api/blog/<int:blog_id>', BlogDetailAPIView.as_view(), name='blog-detail'),
]