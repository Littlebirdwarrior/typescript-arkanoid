//Types
import {Brick} from '../sprites/Brick';
import { Paddle } from '~/sprites/Paddle';
import {Ball} from '../sprites/Ball';

//en P.O, les objets son sécurisé dans le constructeur
export class CanvasView {
    private canvas: HTMLCanvasElement;
    //il est important de permettre le null car au debut il ne sont pas sélectionné
    private context: CanvasRenderingContext2D | null;
    /**L'interface CanvasRenderingContext2D est utilisée pour dessiner des rectangles, 
     * du texte, des images et d'autres objets sur l'élément canvas. 
     * Il fournit le contexte de rendu 2D pour la surface de dessin 
     * d'un élément <canvas>. */
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;

    constructor(canvasName: string){
        //on assigne ke canvas à un html element
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        //chaque element du canvas correspond à un id html
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }

    //Les méthodes
    
    /**
     * @param clear
     *  cette métode n'a pas de retour, d'ou le void 
     * dans le cas ou le contexte est nul, il est nécéssaire*/
    clear():void{
        //cela permet de vider le cadre avant chaque opération
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 
     * @param startFunction 
     * cette fonction permet d'encapsuler la fonction d'action
     * elle lance l'évènement lorsque l'on appuie sur le bouton
     * comme start peut être nulle, on lui appose ? pour gérer le cas ou elle est nulle,
     * le "this" à la fin de start function permet de sélectionner l'élement en cours, ici, le canvasview
     */
    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener('click', () => startFunction(this));
      }
    /**
     * 
     * @param score 
     * fonction retourne forcément un nombre,
     * si un score existe, il est injecté au html
     */
      drawScore(score: number): void {
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = score.toString();
      }

      /**
       * 
       * @param text 
       * Même chose que le score mais pour les infos
       */
      drawInfo(text: string): void {
        if (this.info) this.info.innerHTML = text;
      }

      /**
       * 
       * @param brick
       * @param brick (prends en paramètre les brick, Paddle ou Ball)
       * Ball, c'est une image avec un bg transparent
       * @returns void si les brique n'existe pas, ou dessine les bricks, paddle et ball si elle existe
       */
    
      drawSprite(brick: Brick | Paddle | Ball): void {
        //Si brick est null ou undefined, la fonction retourne immédiatement sans rien faire.
        if (!brick) return;
        
        //la fonction utilise le contexte( la surface 2d du canvas HTML) le pour dessiner l'image associée à l'objet brick
        //erreur lors du debut car la class n'est pas utilisée
        this.context?.drawImage(
          brick.image, //source du dessin, lien vers une image en src
          brick.pos.x, //position horizontale
          brick.pos.y, //position verticale
          brick.width, //hauteur
          brick.height //largeur
        );
      }
    
      /**
       * 
       * @param bricks : array of bricks
       * return void
       * s'occupe de dessiner toute les briques après les avoir rangé dans un tableau
       */
      drawBricks(bricks: Brick[]): void {
        //boucle: pour chaque briques enregistée, on dessine la brique contenue
        bricks.forEach(brick => this.drawSprite(brick));
      }
}