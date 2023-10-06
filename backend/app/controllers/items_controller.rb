class ItemsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_item, only: %i[show update destroy]

  # GET /items or /items.json
# items_controller.rb
  def index
    @items = Item.where(hasFound: true)
    render json: @items
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

  # DELETE /items/1 or /items/1.json
  def destroy
    @item.destroy
    head :no_content
  end

  private
    def set_item
      @item = Item.find(params[:id])
    end

    def item_params
      params.require(:item).permit(:name, :description, :rarity, :item_type)
    end
end
