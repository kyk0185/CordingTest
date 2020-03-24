from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# 회원가입 시리얼라이저


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "last_name")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            self.validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            last_name=validated_data["last_name"]
        )
        return user

# 접속 유지중인지 확인할 시리얼라이저


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")

# 로그인 시리얼라이저


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Unable to log in with provided credentials.")

# 프로필 시리얼라이저


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("nickName", "job")
