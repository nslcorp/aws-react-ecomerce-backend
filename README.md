
### This is mono-repository that keeps services for UI Client

##### Client URL:
```https://d1pcilzlaus1qs.cloudfront.net```

## product-service
#### API URL:      
```https://6obctl4bmf.execute-api.eu-central-1.amazonaws.com/dev```
##### Swagger URL:  
```https://41kei45u2m.execute-api.eu-central-1.amazonaws.com/swagger```



## service-2
...

## service-3
...


# Commands

## Docker
`docker build -t my-app . `

`docker ls`

`docker push -t sn/my-app`



## Elastic Beanstalk
`eb init | create | deploy | terminate | setenv | config | list`

`eb init --region eu-central-1 --profile abcd`

`eb create --single`

`eb create my-env-name --signle --cname my-env-name`

`--single`                ==> env will use single instance without load balancer

`--elb-type application`  ==> env will use one of type (classic, application, network)

