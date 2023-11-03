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

    combo = Combination.find_by(tool: params[:tool], item1: params[:item1], item2: params[:item2])
    comboSwitch = Combination.find_by(tool: params[:tool], item1: params[:item2], item2: params[:item1])
    if combo
      creation = Item.find(combo.creation.id)
      render json: {creation: creation.name, rarity: creation.rarity} 
    elsif comboSwitch
      creationSwitch = Item.find(comboSwitch.creation.id)
      render json: {creation: creationSwitch.name, rarity: creationSwitch.rarity}
    else 
      render json: {creation: "These items don't go together"}
    end
  end

  def all
    @combos = Combination.all
    render json: @combos
  end

end
