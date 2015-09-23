/*Test variables*/
var chr = 'l';
var testString = "HHeellLLLLLlllllloo WWorrldd EE!!:)"

/*main*/
stringParserTest();

//Begin test
function stringParserTest(){
    console.log('Pure JS ');
    var sp = new StringParser(testString);
    
    sp.setCaseInSensitiveness(0);//case insensitiveness is false by default
    
    var result = sp.getNumOccurrenceOfChar(chr);
    console.log("Number of occurrence of char "+chr+" = "+result)
    
    result = sp.getMaxOccurrenceChar();
    console.log("Maximum occurring character = "+result);
    
    result = sp.getMinOccurrenceChar();
    console.log("Minimum occurring character = "+result);

}
//End test

/**
 * Class Name : StringParser
 * Input variable : C Style string[array of character]
 * Members:
 * 1. string -> holds a reference to the input string
 * 2. length -> holds the length of string to reduce computation
 * 3. caseInSensitiveness -> holds the caseInSensitiveness of string operations
 */
function StringParser(str){
    this.string = str;
    this.length = str.length;
    this.caseInSensitiveness = 0
    
    /*Function to set dynamically the caseInsensitiveness*/
    /* if 1 then its caseInsensitive*/
    /* if 0 its caseSensitive*/
    /*By default the program is case sensitive(0)*/
    this.setCaseInSensitiveness = function(n){
        if(n===0)this.caseInSensitiveness=0;
        else this.caseInSensitiveness=1;
    }
    
    /*Function that computes the number of occurrence of a character in the string*/
    /*Running time : O(n)*/
    this.getNumOccurrenceOfChar = function(ch){
        var i = this.length,sum=0,temp=this.string,chr=ch;
        if(this.caseInSensitiveness==1)
        {
            temp=this.string.toUpperCase();
            chr = ch.toUpperCase();
        }
        while(i){
            if(chr == temp[i])sum++;
            --i;
        }
        return sum;
    }
    
     /*If two letters have the same occurrence then the last letter
    to be scanned is printed*/
    //Running time :O(n^2) algo
    this.getMaxOccurrenceChar = function(){
        var max ='',maxCount=0,temp=this.string;
        var j;
        if(this.caseInSensitiveness ===1){
            temp = this.string.toUpperCase();
        }
        for(j=0;j<temp.length;j++){
            var i = j+1;
            var tempVal =0;
            var tempMax = temp[j];
            if(tempMax ==' ')continue;
            if(this.caseInSensitiveness === 1)
                tempMax = tempMax.toUpperCase();
            while((i>=0)&&(i<temp.length)){
                if( tempMax == temp[i])
                    tempVal++;
                i--;
            }
            if(tempVal > maxCount){
                if(tempMax !=max){
                    maxCount = tempVal;
                    max=tempMax;
                }
            }
        }
        return max;
    }
    
     /* Will return the last letter that has the least occurrence*/
    //Running time O(n^2)+ O(n) algo
    this.getMinOccurrenceChar = function(){
        var min ='',minCount=1,temp=this.string;
        var j;
        if(this.caseInSensitiveness ===1){
            temp = this.string.toUpperCase();
        }
        for(j=0;j<temp.length;j++){
            var i = j+1;
            var tempVal =0;
            var tempMin = temp[j];
            if(tempMin ==' ')continue;
            if(this.caseInSensitiveness === 1)
                tempMin = tempMin.toUpperCase();
            while((i>=0)&&(i<temp.length)){
                if( tempMin == temp[i])
                    tempVal++;
                i--;
            }
            if((tempVal <=minCount)&&(tempVal!==0)){
                if(tempMin !=min){
                    minCount = tempVal;
                    min=tempMin;
                }
            }
            if(tempVal === 0) //The last value could occur once or may have many occurences , so last O(n) search here
            {
                if((this.string.indexOf(tempMin))==j)
                {
                    if(tempMin !=min){
                        minCount = tempVal;
                        min=tempMin;
                    }   
                }
            }
        }
        return min;
    }
}

/*A Prototype to display the contents when toString is invoked*/
StringParser.prototype.getString = function() {
    return 'string is = '+this.string +' length = '+this.length;
};
