class Item < ApplicationRecord
    # supposedly allows for local image attachment, not sure
    has_one_attached :sprite
    has_many :item
    has_many :tool, through: :item_tools
end
