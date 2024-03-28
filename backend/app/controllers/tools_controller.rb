class ToolsController < ApplicationController
  before_action :set_tool, only: %i[ show edit update destroy ]


  # GET /tools or /tools.json
  def index
    @tool= Tool.all
    render json: @tool
  end


  # GET /tools/1 or /tools/1.json
  def show
    render json: { data: @tool}, status: :ok
  end

  # GET /tools/new
  def new
    @tool = Tool.new
  end

  # GET /tools/1/edit
  def edit
  end
 # GET /tools/:id/creations
  def show_creations
    puts(@tool)
    @creations = Item.creations_by_tool(@tool)
    render json: @creations
  end


  # POST /tools or /tools.json
  def create
    @tool = Tool.new(tool_params)

    respond_to do |format|
      if @tool.save
        format.html { redirect_to tool_url(@tool), notice: "Tool was successfully created." }
        format.json { render :show, status: :created, location: @tool }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @tool.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tools/1 or /tools/1.json
  def update
    respond_to do |format|
      if @tool.update(tool_params)
        format.html { redirect_to tool_url(@tool), notice: "Tool was successfully updated." }
        format.json { render :show, status: :ok, location: @tool }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @tool.errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /tools/1 or /tools/1.json
  def destroy
    @tool.destroy

    respond_to do |format|
      format.html { redirect_to tools_url, notice: "Tool was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def find_by_name

@tool = Tool.find_by(name: params[:name])
    
    if @tool
      render json: { id: @tool.id }
    else
      render json: { error: "Tool not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tool
      @tool = Tool.find_by(id: params[:id])
      if @tool.nil?
        render json: { error: "Tool not found" }, status: :not_found
        return
      end
    end
    # Only allow a list of trusted parameters through.
    def tool_params
      params.require(:tool).permit(:name, :description, :spriteLocation, :globalCount, :sprite)
    end
end
