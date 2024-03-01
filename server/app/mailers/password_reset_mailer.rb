# app/mailers/password_reset_mailer.rb
class PasswordResetMailer < ApplicationMailer
  def reset_password_email(user)
    @user = user
    mail(to: @user.email, subject: 'Reset Your Password') do |format|
      format.html { render 'password_reset_mailer/reset_password_email' }
    end
  end
end
