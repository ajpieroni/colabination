class Item < ApplicationRecord
    # supposedly allows for local image attachment, not sure
    has_one_attached :sprite
    has_many :item_tools
    has_many :tools, through: :item_tools
end
