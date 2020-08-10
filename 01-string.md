# What every JavaScript developer should know about Unicode
## 1. The idea behind Unicode
The role of Unicode is to provide a list of abstract characters (character set) and assign to each character a unique identifier code point (coded character set).
## 2. Basic Unicode terms
> Unicode provides a unique number for every character,
no matter what the platform,
no matter what the program,
no matter what the language. 
### 2.1 Characters and code points
> Abstract character (or character) is a unit of information used for the organization, control, or representation of textual data.  
> Code point is a number assigned to a single character.(Range from U+0000 to U+10FFFF)

### 2.2 Unicode planes
> Plane is a range of 65,536 contiguous Unicode code points from U+n0000 up to U+nFFFF, where n can take values from 0<sub>16</sub> to 10<sub>16</sub>  
17 planes in total   
Plane 0 -> BMP   
Plane 1-16 -> Astral planes/Supplementary planes  

### 2.3 Code units
> Code unit is a **bit sequence** used to encode each character within a given encoding form  
The character encoding is what transforms abstract code points into physical bits: code units.  

Popular encodings are UTF-8, UTF-16 and UTF-32. Most JavaScript engines use UTF-16 encoding.  

- Code points from BMP are encoded using a single code unit of 16-bit
- Code points from astral planes are encoded using two code units of 16-bit each

### 2.4 Surrogate pairs
> Surrogate pair is a representation for a single abstract character that consists of a sequence of code units of two 16-bit code units, where the first value of the pair is a high-surrogate code unit and the second value is a low-surrogate code unit.   

### 2.5 Combining marks
> Combining mark is a character that applies to the precedent base character to create a grapheme(可以理解为对基本字符的修饰)  

```javascript
console.log('\u0061\u030A'); // => 'å'
console.log('\u00e5'); // => 'å'
// 也就是说 'å' 这个字符可以通过两种转义序列来生成
// 修饰符本身也拥有一个 code point
// Combing marks 和 Surrogate pairs 的区别是后者并没有与之对应的实际的可供显示的字符
const letter1 = '\u0061\u030A';
letter1;
"å"
const letter2 = '\u00e5';
letter2;
"å"
letter1 === letter2;
false
letter1.length === letter2.length
false  
```
## 3. Unicode in JavaScript
> The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 253-1 elements. The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a UTF-16 code unit value.  

Always think of string in JavaScript as **a sequence of code units**. The way string is rendered cannot say clearly what code units it contains.

### 3.1 Escape sequences  

Hexadecimal escape sequence  
\x\<hex>, where \x is a prefix followed by a hexadecimal number \<hex> with a fixed length of 2 digits

Unicode escape sequence  
\u\<hex>, where \u is a prefix followed by a hexadecimal number \<hex> with a fixed length of 4 digits

Code point escape sequence  
u{\<hex>}, where \<hex> is a hexadecimal number with a variable length of 1 to 6 digits

### 3.2 String comparison

Suppose you want to compare two strings that rendered look the same but contain different code unit sequences. Then you may have an unexpected result, because strings that visually look the same are not equal in a comparison:
```javascript
const str1 = 'ça va bien';
const str2 = 'c\u0327a va bien';
console.log(str1);          // => 'ça va bien'
console.log(str2);          // => 'ça va bien'
console.log(str1 === str2); // => false
```
Normalization is a string conversion to a canonical representation, to ensure that canonical-equivalent (and/or compatibility-equivalent) strings have unique representations. 

```javascript
const str1 = 'ça va bien';
const str2 = 'c\u0327a va bien';
console.log(str1 === str2.normalize()); // => true
console.log(str1 === str2);             // => false
```
### 3.3 String length
BMP: no worries

Length and surrogate pairs  
No native and performant way to fix the problem is not available at the moment, but we can use Unicode-aware method to handle it

```javascript
const str = 'cat\u{1F639}';
console.log(str);             // => 'cat😹'
console.log([...str]);        // => ['c', 'a', 't', '😹']
console.log([...str].length); // => 4
console.log(Array.from(str).length); // => 4
```
Length and combining marks  
Normalization 和了解它的局限性

```javascript
// works fine
const drink = 'cafe\u0301';
console.log(drink);                    // => 'café'
console.log(drink.length);             // => 5
console.log(drink.normalize())         // => 'café'
console.log(drink.normalize().length); // => 4
// Long combining character sequences not always have canonical equivalents in one symbol
const drink = 'cafe\u0327\u0301';
console.log(drink);                    // => 'cafȩ́'
console.log(drink.length);             // => 6
console.log(drink.normalize());        // => 'cafȩ́'
console.log(drink.normalize().length); // => 5
```
### 3.4 Character positioning

BMP(Excluding high-surrogate from U+D800 to U+DBFF and low-surrogate from U+DC00 to U+DFFF)  
No worries

Character positioning and surrogate pairs  
- Use the Unicode-aware string iterator and generate an array of symbols [...str][index]
- Get code point number using number = myString.codePointAt(index), then transform the number to a symbol using String.fromCodePoint(number) (recommended option).

```javascript
const omega = '\u{1D6C0} is omega';
console.log(omega);                        // => '𝛀 is omega'
// Option 1
console.log([...omega][0]);                // => '𝛀'
// Option 2
const number = omega.codePointAt(0);
console.log(number.toString(16));          // => '1d6c0'
console.log(String.fromCodePoint(number)); // => '𝛀'
// 一个有趣的发现是 omega.codePointAt(1) 返回的是 low surrogate pair 的 code point
```

Character positioning and combining marks  
Normalization 和了解它的局限性

### 3.5 Regular expression match

Regular expression u flag
```javascript
const smile = '😀';
const regex = /^.$/u;
console.log(regex.test(smile)); // => true
```

Regular expression and combining marks  
With u flag or without it regular expression treats the combining marks as separate code units.

## 4. Summary
Probably the most important concept about Unicode in JavaScript is to **treat strings as sequences of code units**, as they really are.

[Dmitri Pavlutin's Article](https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode)
