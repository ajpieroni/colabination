class UserToolsController < ApplicationController
def create
    username = params[:username]
    tool_name = params[:name]
        
    user = User.find_by(username: username)
    tool = Tool.find_by(name: tool_name)

    unless user && tool
        render json: { error: 'User or tool not found' }, status: :not_found
        return
    end

    user_tool = UserTool.new(user: user, tool: tool)
    if user_tool.save
        render json: { message: 'Tool successfully associated with user' }, status: :created
    else
        render json: { error: user_tool.errors.full_messages }, status: :unprocessable_entity
        end
    end
    def index
        user = User.find_by(username: params[:username])
        
        if user
            tool_names = user.tools.pluck(:name)
            render json: { items: tool_names }
        else
            render json: { error: "User not found" }, status: :not_found
        end
    end
    end