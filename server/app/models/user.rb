class User < ApplicationRecord


    has_secure_password
  
    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    validates :password_confirmation, presence: true, on: :create



    attribute :is_admin, :boolean, default: false


    def generate_jwt
        JWT.encode({ id: id, exp: 1.day.from_now.to_i }, Rails.application.secrets.secret_key_base)
      end
    
  
end
