class UserToolsController < ApplicationController
    def create
        username = params[:username]
        tool_name = params[:name]
        
        user = User.find_by(username: params[:username])
        tool = Tool.find_by(name: params[:tool_name])

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
    end