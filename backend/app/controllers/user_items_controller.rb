class UserItemsController < ApplicationController
  def create
    username = params[:username]
    item_name = params[:name]

    user = User.find_by(username: username)
    item = Item.find_by(name: item_name)

    unless user && item
      render json: { error: 'User or item not found' }, status: :not_found
      return
    end
    
    user_item = UserItem.new(user: user, item: item)
    if user_item.save
      render json: { message: 'Item found by user successfully recorded' }, status: :created
    else
      render json: { error: user_item.errors.full_messages }, status: :unprocessable_entity
    end
  end
  end
