class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :screen_name
      t.string :description
      t.string :password_digest
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
