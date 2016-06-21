# Online-Flight-Timetable

## REST API

### Получить список рейсов

* **URL**  

    `/flights`

* **Method**  

    `GET`

* **URL Params**   

    **Optional:**     
        `departure=[boolean]`    
        `search=[string]`    
        `status=[string]`   

* **Data Params**  
 
    None  

### Добавить рейс

* **URL**  

    `/flights`

* **Method**  

    `POST`

* **URL Params**   

    None    

* **Data Params**  
 
    ```
    {
        number: [string],
        to: [string],
        from: [string],
        planeModel: [string],
        time: [string],
        actualTime: [string],
        status: [string]
    }
    ```

### Редактировать рейс

* **URL**  

    `/flights/:id`

* **Method**  

    `PUT`

* **URL Params**    
   
    **Required:**   
        `id=[integer]`         

* **Data Params**  
 
    ```
    {
        number: [string],
        to: [string],
        from: [string],
        planeModel: [string],
        time: [string],
        actualTime: [string],
        status: [string]
    }
    ```

### Удалить рейс

* **URL**  

    `/flights/:id`

* **Method**  

    `DELETE`

* **URL Params**    
   
    **Required:**     
      `id=[integer]`        

* **Data Params**  
 
    None

