from rest_framework import serializers
from product_management.models import Recipe, Tutorial, Blog

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class TutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
