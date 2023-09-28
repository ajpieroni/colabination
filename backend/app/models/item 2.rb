class Item < ApplicationRecord
    # supposedly allows for local image attachment, not sure
    has_one_attached :sprite
end
