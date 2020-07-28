class CreatePuzzleCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :puzzle_categories do |t|
      t.string :name
      t.string :image_url
    end
  end
end
