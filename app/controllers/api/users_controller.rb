module Api
  class UsersController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      users = User.all
      render json: users
    end

    def show
      user = User.find_by(screen_name: params[:screen_name])
      render json: user
    end

    def create
      user = User.create(user_params)

      if user.valid?
        payload = { user_id: user.id }
        token = encode_token(payload)
        render json: { user: user, jwt: token }
      else
        render json: { user: user, params: user_params, error: user.errors.messages }, status: :not_acceptable
      end
    end

    def update
      user = User.find_by(screen_name: params[:screen_name])
      user.update(user_params)
      if user.update!(user_params)
        payload = { user_id: user.id }
        token = encode_token(payload)
        render json: { user: user, jwt: token }
      else
        render json: { error: user.errors.messages }
      end
    end

    def destroy
      user = User.find_by(screen_name: params[:screen_name])

      if user.destroy
        render json: { success: "User deleted!" }
      else
        render json: { error: user.errors.messages }
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :screen_name, :description, :profile_image_url, :password, :password_confirmation, :email, :phone)
    end
  end
end
