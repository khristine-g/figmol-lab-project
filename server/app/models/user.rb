class User < ApplicationRecord
  before_create :generate_reset_password_token
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  validates :password_confirmation, presence: true, on: :create

  attribute :is_admin, :boolean, default: false

  attr_accessor :reset_password_token, :reset_password_sent_at

  def generate_reset_password_token
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.now.utc
  end

  def generate_jwt
    payload = { user_id: id, email: email, is_admin: is_admin }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
