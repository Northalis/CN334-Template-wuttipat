
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from product_management.models import Recipe, Tutorial, Blog
from product_management.serializers import RecipeSerializer, TutorialSerializer, BlogSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer


class TutorialViewSet(viewsets.ModelViewSet):
    queryset = Tutorial.objects.all().order_by('-created_at')
    serializer_class = TutorialSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tutorial(request):
    serializer = TutorialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def user_recipes(request, user_id):
    recipes = Recipe.objects.filter(created_by=user_id).order_by('-created_at')
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_tutorials(request, user_id):
    tutorials = Tutorial.objects.filter(created_by=user_id).order_by('-created_at')
    serializer = TutorialSerializer(tutorials, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_blogs(request, user_id):
    blogs = Blog.objects.filter(created_by=user_id).order_by('-created_at')
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

class RecipeDetailAPIView(APIView):
    def get(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TutorialDetailAPIView(APIView):
    def get(self, request, pk):
        tutorial = get_object_or_404(Recipe, pk=pk)
        serializer = TutorialSerializer(tutorial)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class BlogDetailAPIView(APIView):
    def get(self, request, pk):
        blog = get_object_or_404(Recipe, pk=pk)
        serializer = BlogSerializer(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)