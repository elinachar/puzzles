class DeletePuzzleCategories < ActiveRecord::Migration[5.2]
  def change
    drop_table :puzzle_categories
  end
end
