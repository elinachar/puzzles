class Category < ApplicationRecord
  has_many :puzzles
  mount_uploader :image_url, ImageUploader

  def to_param
    name.downcase
  end

end
