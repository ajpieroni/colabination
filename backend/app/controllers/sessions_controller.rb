class SessionsController < ApplicationController
    # POST /login.json
    def create
      user = User.find_by(username: params[:username])
      
      if user&.pin.to_s == params[:pin]
        # This just returns the user id to maintain session on the client-side
        render json: { status: 'success', user_id: user.id }
      else
        render json: { status: 'error', message: 'Invalid username/PIN combination' }, status: :unauthorized
      end
    end
    def destroy
      reset_session
      render json: { message: 'Logged out' }
    end
  end