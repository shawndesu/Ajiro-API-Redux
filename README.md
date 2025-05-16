# Open Source REST API Framework  

**Created by AjiroDesu**  

Welcome to the Open Source REST API Framework—a lightweight and customizable solution designed to streamline API development. This framework allows developers to define endpoints effortlessly and ensures seamless integration within any application.  

---

## Table of Contents  

- [Introduction](#introduction)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Adding an API Endpoint](#adding-an-api-endpoint)  
- [Example Endpoint](#example-endpoint)  
- [Automatic Endpoint Linking](#automatic-endpoint-linking)  
- [Configuration](#configuration)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Introduction  

This framework provides a simple yet powerful structure for building RESTful APIs. It enables rapid endpoint creation and automatic registration, making it perfect for both small projects and large-scale applications.  

---

## Features  

- **Modular Design**: Easily add or remove endpoints as separate modules.  
- **Automatic Endpoint Registration**: New endpoints are automatically recognized and registered.  
- **Lightweight**: Minimal dependencies for quick setup and performance.  
- **Customizable**: Tailor the framework to fit your specific project needs.  

---

## Getting Started  

To set up the framework locally:  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/ajirodesu/ajiro-rest-api.git  
   ```  

2. **Navigate to the Project Directory**:  
   ```bash  
   cd ajiro-rest-api  
   ```  

3. **Install Dependencies**:  
   ```bash  
   npm install  
   ```  

4. **Start the Server**:  
   ```bash  
   npm start  
   ```  

The server will start, and you can begin adding your API endpoints.  

---

## Adding an API Endpoint  

To add a new API endpoint, create a JavaScript file in the `api` directory with the following structure:  

```javascript  
exports.config = {  
    name: 'example', // The name of your API  
    author: 'Your_Name', // Your name or alias  
    description: 'API Description', // Brief description of your API  
    category: 'utility', // The category of your API (e.g., utility, data, etc.)  
    link: ['/example?q=test'] // Example link to access your API  
};  

exports.initialize = async function ({ req, res }) {  
    // Your API logic here  
};  
```  

- **`exports.config`**: Defines metadata for the API, including its name, author, description, category, and example link.  
- **`exports.initialize`**: Contains the main logic for the API endpoint, handling requests and responses.  

---

## Example Endpoint  

Here's an example of a simple "Hello World" API:  

```javascript  
exports.config = {  
    name: 'helloWorld',  
    author: 'Lance Ajiro',  
    description: 'Returns a Hello World message',  
    category: 'example',  
    link: ['/helloWorld']  
};  

exports.initialize = async function ({ req, res }) {  
    res.json({ message: 'Hello, World!' });  
};  
```  

This endpoint responds with a JSON object containing a greeting message when accessed.  

---

## Automatic Endpoint Linking  

The framework automatically registers and displays new API endpoints on the main website interface. There's no need to manually add links or update navigation menus.  

---

## Configuration  

The framework includes a `config.json` file to make it easier to customize key settings for your REST API. Here's an example of what the `config.json` file might look like:  

```json  
{  
  "port": "8080",  
  "title": "Ajiro API",  
  "title2": "Ajiro Rest API",  
  "favicon": "https://i.ibb.co/XYk4dXn/image.png",  
  "notifications": [  
    {  
      "title": "New UI",  
      "description": "We updated our UI to get a cooler experience"  
    },  
    {  
      "title": "New Design",  
      "description": "We updated our design to get a cooler experience"  
    }  
  ]  
}  
```  

### Explanation  

- **`port`**: Defines the port the server will run on (default: 8080).  
- **`title`**: Sets the primary title of the API.  
- **`title2`**: Sets the secondary title for the API.  
- **`favicon`**: URL for the favicon used on the API's main interface.  
- **`notifications`**: A list of notification objects to display updates or messages on the API's main page.  

This file provides flexibility to modify settings without altering the core codebase.  

---

## Contributing  

Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository and submit a pull request. Please ensure your contributions align with the project's coding standards and include appropriate documentation.  

---

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.  

---

If you find this project useful, please consider giving it a ⭐ on GitHub. Your support is greatly appreciated!  

Happy coding!  