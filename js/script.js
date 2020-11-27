/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
Global variables
***/
const studentList = document.querySelector('.student-list');
const maxPerPage = 10;

// allStudents contains every student and storing in an array
const allStudents = studentList.children;
//totalpages contains information about how many page numbers to be displayed according to the list
const totalPages = Math.ceil(allStudents.length/maxPerPage);
const page = document.querySelector('.page');

/*** 
   showPage() function first dividing studentList array in sets of 10 students and then displaying each with the help of page parameter
***/
const showPage = (list,page) =>
{
  //startIndex contains the number where the each page will begin according to student list
  let startIndex = (page * maxPerPage) - maxPerPage;
  //lastIndex contains the number where the each page will ends according to student list
  let lastIndex = page * maxPerPage;

  for (let i = 0; i < list.length; i++)
  {
     if (i >= startIndex && i < lastIndex)
     {
        list[i].style.display = 'block';
     }else {
        list[i].style.display = 'none';
     }
  }
}

//appendPageLinks() function appends the list element to the main page according to the totalPages variable and adding 1 to page parameter in showPage() function to display sets of 10 students per page.
const appendPageLinks = (list) =>
{
   //creating and appending ul and li items to the .page 
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   div.className = 'pagination';
   page.appendChild(div);
   const pagination = document.querySelector('.pagination');
   pagination.appendChild(ul);
   
   //checking how many tags should be displayed according to students list
   for (let i =0 ; i < totalPages; i++)
   {
      const li = document.createElement('li');
      li.innerHTML = '<a href>' + (i+1) +'</a>';
      ul.appendChild(li);
   }

   const aTag = document.getElementsByTagName('a');
   //adding class active to the first page by default
   aTag[0].className = 'active';

   //looping through all the <a> tags
   for(let i =0; i<totalPages; i++)
   {
      //adding a click event listner to each <a> tag
      aTag[i].addEventListener('click', (e) =>
      {
         e.preventDefault();
         //calling showPage() function and adding +1 to each index to display next page
         showPage(allStudents, i+1);

         for (let i=0; i<aTag.length; i++)
         {
            if(e.target)
            {
               //if any <a> target tag is clicked remove default class at a[0] and add to the event target
               aTag[i].className='';
               e.target.className = 'active';
            }
         }  
      });
   }
}
//calling showPage() function and passing 1 as page parameter to be display when page loads
showPage(allStudents, 1);
//calling appendPageLinks() function
appendPageLinks(allStudents);

const pageHeader = document.querySelector('.page-header');
const studentsName = document.querySelectorAll('.student-item h3');
const newDiv = document.createElement('input');
newDiv.className = 'newDiv';
pageHeader.appendChild(newDiv);
const search = document.querySelector('.newDiv');
search.placeholder = 'Search for students';
search.focus();

search.addEventListener('keyup', function(e)
{
   let searchStr = e.target.value.toString().toLowerCase();
   

   for(let i=0; i<allStudents.length ; i++)
   {
      let searchName = studentsName[i].textContent;
      if(searchName.indexOf(searchStr) > -1)
      {
         allStudents[i].style.display = 'block';
      }else
      {
         allStudents[i].style.display = 'none';
      }
   }
})

