class CombinationsController < ApplicationController
  # def index
  #   items = Item.includes(:tools).all
  #   render json: { items: items, tools: Tool.all, item_tools: ItemTool.all }
  # end
  
  # def update_items
  #   begin
  #     data = JSON.parse(request.body.read)
  #     discovered_item_ids = data['discovered_item_ids']
      
  #     items_to_update = Item.where(id: discovered_item_ids)
  #     if items_to_update.update_all(discovered: true)
  #       render json: { message: 'Items updated successfully' }
  #     else
  #       render json: { message: 'Items update failed', status: :unprocessable_entity }
  #     end
  #   rescue JSON::ParserError
  #     render json: { message: 'Invalid JSON', status: :bad_request }
  #   rescue => e
  #     render json: { message: "Unexpected error: #{e.message}", status: :internal_server_error }
  #   end
  # end
  def index
    tool = Tool.find_by(name: params[:tool])
    item1 = Item.find_by(name: params[:item1])
    item2 = Item.find_by(name: params[:item2])
    if (tool && item1 && item2)
      combo = Combination.find_by(tool: tool.id, item1: item1.id, item2: item2.id)
      creation = Item.find(combo.creation.id).name
      render json: {creation: creation}
    else 
      render json: {creation: "These items don't go together"}
    end
  end

  def all
    @combos = Combination.all
    render json: @combos
  end

end
