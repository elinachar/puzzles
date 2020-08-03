class AddIndexToNameColumnInPuzzles < ActiveRecord::Migration[5.2]
  def change
    add_index :puzzles, :name
  end
end
