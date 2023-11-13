class ItemsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_item, only: %i[show update destroy]

  # GET /items or /items.json
# items_controller.rb
  def index
    @item = Item.all
    render json: @item
  end

  # GET /items/1 or /items/1.json
  def show
    render json: { data: @item }, status: :ok
  end
  

  # POST /items or /items.json
  def create
    @item = Item.new(item_params)
    
    if @item.save
      render json: { data: @item }, status: :created
    else
      render json: { errors: @item.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1 or /items/1.json
  def update
    if @item.update(item_params)
      render json: { data: @item }, status: :ok
    else
      render json: { errors: @item.errors }, status: :unprocessable_entity
    end
  end

  def final
    @final_items = Item.where(isFinal: true)
    render json: @final_items
  end

  # DELETE /items/1 or /items/1.json
  def destroy
    @item.destroy
    head :no_content
  end
  
  def find_by_name
    @item = Item.find_by(name: params[:name])
    
    if @item
      render json: { id: @item.id }
    else
      render json: { error: "Item not found" }, status: :not_found
    end
  end

  private
    def set_item
      @item = Item.find(params[:id])
    end

    def item_params
      params.require(:item).permit(:name, :description, :rarity, :item_type)
    end
end
