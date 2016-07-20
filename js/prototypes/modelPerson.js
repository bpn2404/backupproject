/*This class represents the date model of the model(person)*/

'use strict';

app.module('modelPerson', [])
.controller('ModelPersonController', function(modelName, height, hair, eyes, bust, weist, hips, shoue) {
  if(modelName === undefined)
        this.modelName = "";
    else
        this.modelName = modelName;    
   
    if(height === undefined)
        this.height = "";
    else
        this.height = height;        
    
    if(hair === undefined)
        this.hair = "";
    else
        this.hair = hair;
    
    if(eyes === undefined)
        this.eyes = "";
    else
        this.eyes = eyes;
    
    if(bust === undefined)
        this.bust = "";
    else
        this.bust = bust;
        
    if(weist === undefined)
        this.weist = "";
    else
        this.weist = weist;
        
    if(hips === undefined)
        this.hips = "";
    else
        this.hips = hips;
    
    if(shoue === undefined)
        this.shoue = "";
    else
        this.shoue = shoue;

  
});