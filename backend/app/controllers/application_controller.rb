class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    auto_session_timeout_actions
    helper_method :current_user
  
    private
  
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
end
  