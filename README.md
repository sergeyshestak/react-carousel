# react-carousel

  You can see an example of app on Github Pages: 
  
  https://sergeyshestak.github.io/react-carousel/dist/index.html

# Install

  Clone the git repository:

    git clone https://github.com/sergeyshestak/react-carousel.git
  
  Go into the repository:
  
    cd react-carousel
    
  Use the package manager npm to install dependencies:
  
      npm install
      
# Development 

  This start the process in development mode and start a webpack dev server:
      
      npm run dev
      
  This will launch the react-carousel at https://localhost:9000/
      
# Build

  If you want build the app run this command:
  
    npm run start
    
# Props Types

  | Prop | Description | Default | Type |
  |------|-------------|---------|------|
  | content | Array of html markup |  | Array |
  | width | Width of carousel | 600 | Number |
  | height | Height of carousel | 600 | Number |
  | infinite | Enable/disable infinite option | true | Boolean |
  | slides | How many slides to show | 1 | Number |
