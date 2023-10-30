class Combination < ApplicationRecord
    belongs_to :tool
    belongs_to :item1, :class_name => 'Item'
    belongs_to :item2, :class_name => 'Item', optional: true
    belongs_to :creation, :class_name => 'Item'
end