class UserTool < ApplicationRecord
  belongs_to :user
  belongs_to :tool
  has_many :user_tools
  has_many :tools, through: :user_tools
  validates :user_id, uniqueness: { scope: :tool_id }
end
