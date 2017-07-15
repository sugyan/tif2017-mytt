class CreateResults < ActiveRecord::Migration[5.1]
  def change
    create_table :results do |t|
      t.string :key
      t.string :data
      t.string :url

      t.timestamps
    end
    add_index :results, :key, unique: true
  end
end
