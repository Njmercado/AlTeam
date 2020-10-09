Rails.application.routes.draw do
  root "pages#index"

  namespace :api do
    resources :users, param: :id
    resources :tweets, param: :id
    post "/login", to: "auth#login"
    post "/check_auth", to: "auth#check_auth"
    post "/check_password", to: "auth#check_password"
    post "/users/check_screen_name_availability", to: "signup#check_screen_name_availability"
  end

  get "*path", to: "pages#index", via: :all
end
