class AuthController < ApplicationController
  require_relative '../mailers/password_reset_mailer'


  def signup
    user = User.new(user_params)
    user.is_admin = false

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
  
      # Include is_admin status in the response
      render json: { token: token, is_admin: user.is_admin }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end


 


  def forgot_password
    user = User.find_by(email: params[:email])
  
    if user
      user.generate_reset_password_token # Correct method name
      PasswordResetMailer.with(user: user).reset_password_email(user).deliver_now
  
      render json: { message: 'Password reset instructions sent to your email.' }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end
  

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
