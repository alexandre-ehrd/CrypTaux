<?php 
   function popoverCreateElement($popoverDirection, $description, $link)
   {
      $linkElement = "";
      if ($link != "") {
         $linkElement = "<a href='$link' target='_blank'>En savoir plus</a>";
      }
      
      echo "
         <span class='popover'>
            <i class='bi bi-question-circle'>
               <div class='$popoverDirection popover-wrapper'>
                  <div class='popover-content'>
                     <p>$description</p>
                     $linkElement
                  </div>
               </div>
            </i>
         </span>
      ";
   }
?>