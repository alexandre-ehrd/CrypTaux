<?php 
   function popoverCreateElement($popoverDirection, $description, $link)
   {
      $linkElement = "";
      if ($link != "") {
         $linkElement = "<a href='$link' target='_blank'>En savoir plus</a>";
      }

      echo "
      <span class='popover'>
         <i class='bi bi-question-circle'></i>
         <div class='$popoverDirection popover-content'>
            <p>$description</p>
            $linkElement
         </div>
      </span>
      ";
   }
?>