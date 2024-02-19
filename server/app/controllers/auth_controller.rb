class AuthController < ApplicationController
    def signup
        user = User.new(user_params)
    
        if user.save
          token = user.generate_jwt
          render json: { token: token }
        else
          render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
      end
    def login
      user = User.find_by(email: params[:email])
  
      if user && user.authenticate(params[:password])
        token = user.generate_jwt
        render json: { token: token }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
  