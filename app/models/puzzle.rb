class Puzzle < ApplicationRecord
  belongs_to :category, optional: true
  mount_uploader :image_url, ImageUploader

  def to_param
    name.parameterize
  end

end
