# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_08_154856) do
  create_table "active_storage_attachments", charset: "utf8mb3", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb3", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "combinations", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "tool_id"
    t.bigint "item1_id"
    t.bigint "item2_id"
    t.bigint "creation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creation_id"], name: "index_combinations_on_creation_id"
    t.index ["item1_id"], name: "index_combinations_on_item1_id"
    t.index ["item2_id"], name: "index_combinations_on_item2_id"
    t.index ["tool_id"], name: "index_combinations_on_tool_id"
  end

  create_table "item_tools", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "tool_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_tools_on_item_id"
    t.index ["tool_id"], name: "index_item_tools_on_tool_id"
  end

  create_table "items", charset: "utf8mb3", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "item_type"
    t.integer "rarity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "hasFound"
    t.boolean "isFinal"
  end

  create_table "tools", charset: "utf8mb3", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "globalCount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "hasFound"
  end

  create_table "user_items", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_user_items_on_item_id"
    t.index ["user_id"], name: "index_user_items_on_user_id"
  end

  create_table "user_tools", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "tool_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tool_id"], name: "index_user_tools_on_tool_id"
    t.index ["user_id"], name: "index_user_tools_on_user_id"
  end

  create_table "users", charset: "utf8mb3", force: :cascade do |t|
    t.string "username"
    t.integer "pin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "combinations", "items", column: "creation_id"
  add_foreign_key "combinations", "items", column: "item1_id"
  add_foreign_key "combinations", "items", column: "item2_id"
  add_foreign_key "combinations", "tools"
  add_foreign_key "item_tools", "items"
  add_foreign_key "item_tools", "tools"
  add_foreign_key "user_items", "items"
  add_foreign_key "user_items", "users"
  add_foreign_key "user_tools", "tools"
  add_foreign_key "user_tools", "users"
end
