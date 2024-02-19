class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    after_action :set_csrf_cookie

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = form_authenticity_token
  end
end
