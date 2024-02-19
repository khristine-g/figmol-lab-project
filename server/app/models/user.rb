class User < ApplicationRecord
    # has_many :quizzes

    has_secure_password
  
    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    validates :password_confirmation, presence: true, on: :create
  
end
