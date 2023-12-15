// Event listner when DOM is loaded
document.addEventListener('DOMContentLoaded' , function()
{
    var slideHeadings = document.querySelector('.slide-main-content-heading');

    var slideLists = document.querySelectorAll('.line-dot-content ul li');

    // headings
    var headings = ['Justice Chatbot', 'Legal Assistance', 'Expert Support'];
 
    // list Items
    var categories = [
       ["Instant Legal Information", "Self-Help Legal Exploration", "Legal Learning Resources", "Efficient Legal Support System", "User-Friendly Interface"],
       ["Category-Specific Assistance", "Empowerment Through Knowledge", "Case Evaluation and Strategy", "Legal Research and Information", "Educational Resources"],
       ["Direct Access to Legal Professionals", "Personalized Consultations", "Confidentiality and Privacy", "Case-Specific Guidance", "Document Review and Drafting"]
    ]

    // Initial state for Heading and List item 
    var currentHeadings = 0;
    var currentCategories = 0;

    // Update Headings
    function updateHeadings()
    {
        slideHeadings.textContent = headings[currentHeadings];
    }

    

    // Update List Items
    function updateListItems()
    {
        for(var i = 0; i < slideLists.length; i++)
        {
            slideLists[i].textContent = categories[currentCategories][i];
        }
    }

    
    // Set Interval function 
    setInterval(function()
    {
        // updates the heading and categories state by incrmentinng and using modulo operator to esnsure they loop back to 0 when they reach the array length
        currentHeadings = (currentHeadings + 1) % headings.length;
        currentCategories = (currentCategories + 1) % categories.length;

        updateHeadings();
        updateListItems();

    }, 5000)

    // Initial Update
    updateHeadings();
    updateListItems();

});