Rails.application.routes.draw do

  resources :users
  
  post '/signup', to: 'users#create', defaults: { format: :json }
  post '/login', to: 'sessions#create', defaults: { format: :json }
  delete '/logout', to: 'sessions#destroy', defaults: {format: :json}


  resources :tools do
    collection do
      get 'find_by_name/:name', to: 'tools#find_by_name', as: 'find_by_name'
    end
    member do
      get 'creations', to: 'tools#show_creations'
    end
    resources :items, only: [:create, :update]
  end
  
  resources :items do
    collection do
      get 'find_by_name/:name', to: 'items#find_by_name', as: 'find_by_name'
      get 'find_by_name_craft/:name', to: 'items#find_by_name_craft', as: 'find_by_name_craft'
    # GET /items/find_description_by_name/:name
    # http://localhost:8081/items/find_description_by_name/trash
      get 'find_description_by_name/:name', to: 'items#find_description_by_name', as: 'find_description_by_name'
    end
  end

  post 'user_items', to: 'user_items#create'
  post 'user_tools', to: 'user_tools#create'

  resources :user_items, only: [:create, :index] do
    collection do
      get 'final_items'
      post 'final_items'
    end
  end
  # resources :user_items, only: [:create, :index]  

  resources :user_tools, only: [:create, :index]  

  # namespace :api do
  #   resources :combinations, only: [:index, :update]
  #   put 'update_items', to: 'combinations#update_items'
  # end

  resources :combinations, only: [:index]
  get 'combinations_all', to: 'combinations#all'



end


